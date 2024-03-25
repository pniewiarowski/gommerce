using Auth.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auth.Controller.API.V1;

public class Role(Context context): Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet]
    [Route("/api/v1/roles")]
    public IActionResult Get()
    {
        return Json(Resource.Role.FromCollection(context.Roles.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/roles/{id}")]
    public IActionResult GetByID(uint id)
    {
        return Json(Resource.Role.From(context.Roles.Find(id)));
    }

    [HttpPost]
    [Route("/api/v1/roles")]
    public IActionResult Post([FromBody] Model.Role role)
    {
        context.Roles.Add(role);
        context.SaveChanges();

        return GetByID(role.ID);
    }

    [HttpPut]
    [Route("/api/v1/roles/{id}")]
    public IActionResult Put(uint id, [FromBody] Model.Role updatedRole)
    {
        updatedRole.ID = id;

        context.Roles.Entry(updatedRole).State = EntityState.Modified;
        context.SaveChanges();

        return GetByID(id);
    }

    [HttpDelete]
    [Route("/api/v1/roles/{id}")]
    public IActionResult Delete(uint id)
    {
        var role = context.Roles.Find(id);

        context.Attach(role);
        context.Remove(role);
        context.SaveChanges();

        return Get();
    }
}
