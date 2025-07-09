import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RedBus Backend API',
      version: '1.0.0',
      description: 'A simple bus booking application API similar to RedBus',
      contact: {
        name: 'API Support',
        email: 'support@redbus.com'
      }
    },
    servers: [
      {
        url: '/',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'phone', 'password', 'name', 'role'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated unique identifier'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            phone: {
              type: 'string',
              description: 'User phone number'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password'
            },
            name: {
              type: 'string',
              description: 'User full name'
            },
            role: {
              type: 'string',
              enum: ['passenger', 'driver', 'owner', 'admin'],
              description: 'User role'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Bus: {
          type: 'object',
          required: ['owner', 'driver', 'license_number', 'type', 'is_ac', 'total_sleepers', 'total_seats'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated unique identifier'
            },
            owner: {
              type: 'string',
              description: 'Bus owner user ID'
            },
            driver: {
              type: 'string',
              description: 'Bus driver user ID'
            },
            license_number: {
              type: 'string',
              description: 'Bus license number'
            },
            contact: {
              type: 'string',
              description: 'Contact phone number'
            },
            type: {
              type: 'string',
              description: 'Bus type (e.g., AC, Non-AC, Sleeper)'
            },
            is_ac: {
              type: 'boolean',
              description: 'Whether bus is AC or not'
            },
            total_sleepers: {
              type: 'number',
              description: 'Total number of sleeper seats'
            },
            total_seats: {
              type: 'number',
              description: 'Total number of seats'
            }
          }
        },
        Passenger: {
          type: 'object',
          required: ['name', 'age', 'gender', 'seatNumber'],
          properties: {
            name: {
              type: 'string',
              description: 'Passenger name'
            },
            age: {
              type: 'number',
              minimum: 1,
              maximum: 120,
              description: 'Passenger age'
            },
            gender: {
              type: 'string',
              enum: ['male', 'female', 'other'],
              description: 'Passenger gender'
            },
            seatNumber: {
              type: 'string',
              description: 'Assigned seat number'
            }
          }
        },
        Booking: {
          type: 'object',
          required: ['tripId', 'seatNumbers', 'passengers', 'totalAmount'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated unique identifier (read-only)',
              readOnly: true
            },
            userId: {
              type: 'string',
              description: 'User ID reference (optional)'
            },
            tripId: {
              type: 'string',
              description: 'Trip ID reference'
            },
            seatNumbers: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of seat numbers'
            },
            passengers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Passenger'
              },
              description: 'List of passengers'
            },
            totalAmount: {
              type: 'number',
              minimum: 0,
              description: 'Total booking amount'
            },
            status: {
              type: 'string',
              enum: ['confirmed', 'cancelled', 'completed', 'pending'],
              default: 'pending',
              description: 'Booking status'
            },
            paymentStatus: {
              type: 'string',
              enum: ['pending', 'paid', 'failed', 'refunded'],
              default: 'pending',
              description: 'Payment status'
            },
            bookedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Booking timestamp'
            }
          }
        },
        Payment: {
          type: 'object',
          required: ['bookingId', 'amount', 'paymentMethod'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated unique identifier'
            },
            bookingId: {
              type: 'string',
              description: 'Booking ID reference'
            },
            amount: {
              type: 'number',
              minimum: 0,
              description: 'Payment amount'
            },
            paymentMethod: {
              type: 'string',
              enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
              description: 'Payment method'
            },
            transactionId: {
              type: 'string',
              description: 'Unique transaction ID'
            },
            status: {
              type: 'string',
              enum: ['pending', 'paid', 'failed'],
              default: 'pending',
              description: 'Payment status'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Payment creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'boolean',
              description: 'Response status'
            },
            message: {
              type: 'string',
              description: 'Response message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string'
                  },
                  path: {
                    type: 'string'
                  }
                }
              },
              description: 'Validation errors'
            },
            count: {
              type: 'number',
              description: 'Count of items'
            },
            page: {
              type: 'number',
              description: 'Current page'
            },
            limit: {
              type: 'number',
              description: 'Items per page'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts'
  ]
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'RedBus API Documentation',
    customfavIcon: '/assets/favicon.ico',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      docExpansion: 'list',
      filter: true,
      showRequestHeaders: true
    }
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
  
  // Swagger JSON endpoint
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
