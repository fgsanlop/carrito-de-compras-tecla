module.exports = class Product {
    constructor(id, categoryId, title, description, price, updated, picture, stock, sold) {
        this.id = id; 
        this.categoryId = categoryId;
        this.title = title;
        this.description = description;
        this.price = price;
        if (updated === null) 
            this.update = '';
        else
            this.updated = new Date(updated).toLocaleString();
        this.picture = picture;
        this.stock = stock;
        this.sold = sold;
    }
}