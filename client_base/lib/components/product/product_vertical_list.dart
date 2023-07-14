import 'package:flutter/material.dart';
import 'package:client_base/components/product/product_title_list.dart';
import 'package:client_base/components/product/product_vertical_list_item.dart';
import 'package:client_base/models/product/product_model.dart';

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
          ProductTitleList(title),
          Container(
            color: Colors.black12,
            height: 1,
          ),
          ...products.map((product) => ProductVerticalListItem(product)),
        ],
      ),
    );
  }
}
