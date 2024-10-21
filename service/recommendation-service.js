import mongoose from 'mongoose';
import { Order } from '../models/order'; 
const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';

mongoose.connect(`${uri}/thecollegestore?`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection established successfully'))
  .catch(err => console.error('Error connecting to the database:', err));

export async function getRecommendationsFromPurchases(userId) {
  if (!Order) {
    console.error('Order model is not defined.');
    return []; 
  }

  console.log('Fetching recommendations for user:', userId);
  
  try {
    const recentOrders = await Order.find({ userId }).sort({ date: -1 }).limit(5);

    let recommendedProductIds = [];
    recentOrders.forEach(order => {
      order.cartItems.forEach((item, index) => {
        for (let productId in item) {
          if (item[productId] !== 0) {
            recommendedProductIds.push(productId);
          }
        }
      });
    });

    console.log('Recommended IDs:', recommendedProductIds);

    return [...new Set(recommendedProductIds)];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return []; 
  }
}