import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Store API",
      version: "1.0.0",
      description: "API for the Simple Store application",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    tags: [
      {
        name: "Products",
        description: "Product endpoints",
      },
      {
        name: "Cart",
        description: "Shopping cart endpoints",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "1",
            },
            name: {
              type: "string",
              example: "Nike Air Max",
            },
            price: {
              type: "number",
              example: 1999.99,
            },
            image: {
              type: "string",
              example: "https://example.com/image.jpg",
            },
          },
        },

        CartItem: {
          type: "object",
          properties: {
            productId: {
              type: "string",
              example: "1",
            },
            quantity: {
              type: "integer",
              example: 2,
            },
          },
        },

        AddToCartRequest: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: {
              type: "string",
              example: "1",
            },
            quantity: {
              type: "integer",
              example: 1,
            },
          },
        },

        UpdateCartRequest: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: {
              type: "string",
              example: "1",
            },
            quantity: {
              type: "integer",
              example: 2,
            },
          },
        },
      },
    },
    paths: {
      "/products": {
        get: {
          tags: ["Products"],
          summary: "Get all products",
          responses: {
            "200": {
              description: "List of products",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get a product by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              example: "1",
            },
          ],
          responses: {
            "200": {
              description: "Product found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            "404": {
              description: "Product not found",
            },
          },
        },
      },

      "/cart": {
        get: {
          tags: ["Cart"],
          summary: "Get current cart",
          responses: {
            "200": {
              description: "Current shopping cart",
            },
          },
        },

        post: {
          tags: ["Cart"],
          summary: "Add a product to the cart",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AddToCartRequest",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Product added to cart",
            },
          },
        },

        patch: {
          tags: ["Cart"],
          summary: "Update cart quantity",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateCartRequest",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Cart updated",
            },
          },
        },
      },
    },
  },
  apis: [],
});
