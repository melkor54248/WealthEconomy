namespace forCrowd.WealthEconomy.WebApi.Controllers.OData
{
    using BusinessObjects;
    using Facade;
    using forCrowd.WealthEconomy.WebApi.Filters;
    using Microsoft.AspNet.Identity;
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.OData;

    public class ElementFieldController : BaseODataController
    {
        public ElementFieldController()
        {
            MainUnitOfWork = new ElementFieldUnitOfWork();
        }

        protected ElementFieldUnitOfWork MainUnitOfWork { get; private set; }

        // POST odata/ElementField
        public async Task<IHttpActionResult> Post(Delta<ElementField> patch)
        {
            var elementField = patch.GetEntity();

            // Don't allow the user to set these fields / coni2k - 29 Jul. '17
            // TODO Use ForbiddenFieldsValidator?: Currently breeze doesn't allow to post custom (delta) entity
            // TODO Or use DTO?: Needs a different metadata than the context, which can be overkill
            elementField.Id = 0;
            elementField.IndexRatingTotal = 0;
            elementField.IndexRatingCount = 0;
            elementField.CreatedOn = DateTime.UtcNow;
            elementField.ModifiedOn = DateTime.UtcNow;
            elementField.DeletedOn = null;

            // Owner check: Entity must belong to the current user
            var userId = await MainUnitOfWork
                .AllLiveIncluding(item => item.Element.ResourcePool)
                .Where(item => item.ElementId == elementField.ElementId)
                .Select(item => item.Element.ResourcePool.UserId)
                .Distinct()
                .SingleOrDefaultAsync();

            var currentUserId = User.Identity.GetUserId<int>();

            if (currentUserId != userId)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            await MainUnitOfWork.InsertAsync(elementField);

            return Created(elementField);
        }

        // PATCH odata/ElementField(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [ForbiddenFieldsValidator(nameof(ElementField.Id), nameof(ElementField.ElementId), nameof(ElementField.IndexRatingTotal), nameof(ElementField.IndexRatingCount), nameof(ElementField.CreatedOn), nameof(ElementField.ModifiedOn), nameof(ElementField.DeletedOn))]
        [EntityExistsValidator(typeof(ElementField))]
        [ConcurrencyValidator(typeof(ElementField))]
        public async Task<IHttpActionResult> Patch(int key, Delta<ElementField> patch)
        {
            var elementField = await MainUnitOfWork.AllLiveIncluding(item => item.Element.ResourcePool).SingleOrDefaultAsync(item => item.Id == key);

            // Owner check: Entity must belong to the current user
            var currentUserId = User.Identity.GetUserId<int>();
            if (currentUserId != elementField.Element.ResourcePool.UserId)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            patch.Patch(elementField);

            await MainUnitOfWork.SaveChangesAsync();

            return Ok(elementField);
        }

        // DELETE odata/ElementField(5)
        [EntityExistsValidator(typeof(ElementField))]
        // TODO breeze doesn't support this at the moment / coni2k - 31 Jul. '17
        // [ConcurrencyValidator(typeof(ElementField))]
        public async Task<IHttpActionResult> Delete(int key, Delta<ElementField> patch)
        {
            var elementField = await MainUnitOfWork.AllLiveIncluding(item => item.Element.ResourcePool).SingleOrDefaultAsync(item => item.Id == key);

            // Owner check: Entity must belong to the current user
            var currentUserId = User.Identity.GetUserId<int>();
            if (currentUserId != elementField.Element.ResourcePool.UserId)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            await MainUnitOfWork.DeleteAsync(elementField.Id);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
