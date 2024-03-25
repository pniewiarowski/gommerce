using Auth.Database;
using Auth.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auth.Controller.API.V1;

public class User(Context context, IHasher hasher) : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet]
    [Route("/api/v1/users")]
    public IActionResult Get()
    {
        return Json(Resource.User.FromCollection(context.Users.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/users/{id}")]
    public IActionResult GetByID(uint id)
    {
        return Json(Resource.User.From(context.Users.Find(id)));
    }

    [HttpPost]
    [Route("/api/v1/users")]
    public IActionResult Post([FromBody] Model.User newUser)
    {
        var userAlreadyExists = context.Users.Where(user => user.Email == newUser.Email).ToList().Count != 0;
        if (userAlreadyExists)
        {
            return BadRequest("user with provided email already exists.");
        }

        newUser.RoleID = Service.Const.Role.RegularUserID;
        newUser.Password = hasher.From(newUser.Password);
        context.Users.Add(newUser);
        context.SaveChanges();

        return Json(Resource.User.From(newUser));
    }

    [HttpPut]
    [Route("/api/v1/users")]
    public IActionResult Put(uint id, [FromBody] Model.User updatedUser)
    {
        updatedUser.ID = id;

        context.Users.Entry(updatedUser).State = EntityState.Modified;
        context.SaveChanges();

        return GetByID(id);
    }

    [HttpDelete]
    [Route("/api/v1/users/{id}")]
    public IActionResult Delete(uint id)
    {
        var user = context.Users.Find(id);

        context.Attach(user);
        context.Remove(user);
        context.SaveChanges();

        return Get();
    }
}