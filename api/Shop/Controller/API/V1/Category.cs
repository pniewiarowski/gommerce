using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;

namespace Shop.Controller.API.V1;

public class Category(Context context) : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet]
    [Route("/api/v1/categories")]
    public IActionResult Get()
    {
        return Json(Resource.Category.FromCollection(context.Categories.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/categories/{id}")]
    public IActionResult GetByID(uint id)
    {
        return Json(Resource.Category.From(context.Categories.Find(id)));
    }

    [HttpPost]
    [Route("/api/v1/categories")]
    public IActionResult Post([FromBody] Model.Category category)
    {
        context.Categories.Add(category);
        context.SaveChanges();

        return GetByID(category.ID);
    }

    [HttpPut]
    [Route("/api/v1/categories/{id}")]
    public IActionResult Put(uint id, [FromBody] Model.Category updatedCategory)
    {
        updatedCategory.ID = id;

        context.Categories.Entry(updatedCategory).State = EntityState.Modified;
        context.SaveChanges();

        return GetByID(id);
    }



    [HttpDelete]
    [Route("/api/v1/categories/{id}")]
    public IActionResult Delete(uint id)
    {
        var category = context.Categories.Find(id);

        context.Categories.Attach(category);
        context.Categories.Remove(category);
        context.SaveChanges();

        return Get();
    }

    [HttpGet]
    [Route("/api/v1/categories/{id}/products")]
    public IActionResult GetProducts(uint id)
    {
        var products = context.Products.Where(product => product.CategoryID == id).ToList();

        return Json(Resource.Product.FromCollection(products));
    }
}