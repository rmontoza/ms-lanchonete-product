export default class Product {
    public id: string;
    public name: string;
    public category: string;
    public value: number;
    public active: boolean;
  
    constructor(id: string, name: string, category: string, value: number, active: boolean) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.value = value;
      this.active = active;
    }
  }
  