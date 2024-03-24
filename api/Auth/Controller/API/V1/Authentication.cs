using Auth.Database;
using Auth.Resource;
using Auth.Service;
using Auth.Service.Const;
using Auth.Service.Implementation;
using Microsoft.AspNetCore.Mvc;

namespace Auth.Controller.API.V1;

public class Authentication(Context context, IHasher hasher, IToken token) : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpPost]
    [Route("/api/v1/authentication/register")]
    public IActionResult Register([FromBody] Model.User newUser)
    {
        var userAlreadyExists = context.Users.Where(user => user.Email == newUser.Email).ToList().Count != 0;
        if (userAlreadyExists)
        {
            return BadRequest("user with provided email already exists.");
        }

        newUser.RoleID = Role.RegularUserID;
        newUser.Password = hasher.From(newUser.Password);
        context.Users.Add(newUser);
        context.SaveChanges();

        return Json(Resource.User.From(newUser));
    }

    [HttpPost]
    [Route("/api/v1/authentication/jwt")]
    public IActionResult JWT([FromBody] Model.User requestUser)
    {
        var userCtx = context.Users.Where(user => user.Email == requestUser.Email);
        var userExists = userCtx.ToList().Count != 0;
        if (!userExists)
        {
            return BadRequest("user with provided email do not exists.");
        }

        var user = userCtx.First();
        var isPasswordCorrect = hasher.Compare(requestUser.Password, user.Password);
        if (!isPasswordCorrect)
        {
            return BadRequest("provided email or password are not valid.");
        }

        var response = new AuthResponse
        {
            ID = user.ID,
            Token = token.Generate(user.ID, user.Email, user.RoleID)
        };

        return Json(response);
    }
}