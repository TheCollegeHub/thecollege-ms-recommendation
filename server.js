import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { getRecommendationsFromPurchases } from './service/recommendation-service';
const PROTO_PATH = './grpc/protos/recommendation.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const recommendationProto = grpc.loadPackageDefinition(packageDefinition).recommendation;

const server = new grpc.Server();

server.addService(recommendationProto.RecommendationService.service, {
  GetRecommendations: async (call, callback) => {
    const { userId } = call.request;
    console.log(`Fetching recommendations for user: ${userId}`);

    const recommendations = await getRecommendationsFromPurchases(userId);
    const response = {
        recommendedProductIds: recommendations
    };
    callback(null, response);
  },
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Recommendation service running on port ${port}`);
});
