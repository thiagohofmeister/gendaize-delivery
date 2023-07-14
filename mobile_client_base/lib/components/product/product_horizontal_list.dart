import 'package:flutter/material.dart';
import 'package:mobile_client_base/components/product/product_horizontal_list_item.dart';
import 'package:mobile_client_base/components/product/product_title_list.dart';
import 'package:mobile_client_base/models/product/product_model.dart';

class ProductHorizontalList extends StatelessWidget {
  final String title;
  final List<ProductModel> products;

  const ProductHorizontalList({
    Key? key,
    required this.title,
    required this.products,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ProductTitleList(title),
        SizedBox(
          height: 120,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: products.length,
            itemBuilder: (context, index) {
              return SizedBox(
                width: MediaQuery.of(context).size.width -
                    32 -
                    (products.length > 1 ? 80 : 0),
                height: 120,
                child: ProductHorizontalListItem(
                  products[index],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
