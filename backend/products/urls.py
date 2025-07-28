from django.urls import path
from .views import ProductListView, OrderCreateView, OrderItemUpdateDeleteView

urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('orders/', OrderCreateView.as_view()),
    path('order-items/<int:pk>/', OrderItemUpdateDeleteView.as_view()),
]
