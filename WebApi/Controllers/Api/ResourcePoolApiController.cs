﻿namespace forCrowd.WealthEconomy.WebApi.Controllers.Api
{
    using Facade;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Http;

    [RoutePrefix("api/ResourcePoolApi")]
    public class ResourcePoolApiController : BaseApiController
    {
        IResourcePoolManager _resourcePoolManager;

        protected IResourcePoolManager ResourcePoolManager
        {
            get
            {
                if (_resourcePoolManager == null)
                {
                    _resourcePoolManager = new ResourcePoolManager();
                }
                return _resourcePoolManager;
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [Route("{resourcePoolId}/UpdateComputedFields")]
        public async Task<IHttpActionResult> UpdateComputedFields(int resourcePoolId)
        {
            var resourcePool = await ResourcePoolManager.GetByIdAsync(resourcePoolId);

            if (resourcePool == null)
            {
                return NotFound();
            }

            await ResourcePoolManager.UpdateComputedFieldsAsync(resourcePoolId);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
