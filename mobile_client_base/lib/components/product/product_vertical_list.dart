import 'package:flutter/material.dart';
import 'package:mobile_client_base/components/product/product_vertical_list_item.dart';
import 'package:mobile_client_base/models/product/product_model.dart';

class ProductVerticalList extends StatelessWidget {
  final String title;
  final List<ProductModel> products;

  const ProductVerticalList({
    Key? key,
    required this.title,
    required this.products,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 16.0),
            child: Text(
              title,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          SizedBox(
            width: double.infinity,
            child: ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                return ProductVerticalListItem(products[index]);
              },
            ),
          ),
        ],
      ),
    );
  }
}
