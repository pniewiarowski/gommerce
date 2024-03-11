using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;

namespace Shop.Controller.API.V1;

public class Product(Context context) : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet]
    [Route("/api/v1/products")]
    public IActionResult Get()
    {
        return Json(Resource.Product.FromCollection(context.Products.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/products/{id}")]
    public IActionResult GetByID(uint id)
    {
        return Json(Resource.Product.From(context.Products.Find(id)));
    }

    [HttpPost]
    [Route("/api/v1/products")]
    public IActionResult Post([FromBody] Model.Product product)
    {
        context.Products.Add(product);
        context.SaveChanges();

        return GetByID(product.ID);
    }

    [HttpPut]
    [Route("/api/v1/products/{id}")]
    public IActionResult Put(uint id, [FromBody] Model.Product updatedProduct)
    {
        updatedProduct.ID = id;

        context.Products.Entry(updatedProduct).State = EntityState.Modified;
        context.SaveChanges();

        return GetByID(id);
    }

    [HttpDelete]
    [Route("/api/v1/products/{id}")]
    public IActionResult Delete(uint id)
    {
        var product = context.Products.Find(id);

        context.Attach(product);
        context.Remove(product);
        context.SaveChanges();

        return Get();
    }
}