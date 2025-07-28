from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer, OrderSerializer
from django.contrib.auth.models import AnonymousUser

class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class OrderCreateView(APIView):
    def post(self, request):
        data = request.data.copy()

        # For now, treat all users as anonymous
        if isinstance(request.user, AnonymousUser):
            data['customer'] = None
        else:
            data['customer'] = request.user.id

        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            return Response({"message": "Order created successfully", "order_id": order.id})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
from rest_framework import generics
from .models import OrderItem
from .serializers import OrderItemSerializer

class OrderItemUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer