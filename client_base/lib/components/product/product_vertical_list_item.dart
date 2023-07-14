import 'package:flutter/material.dart';
import 'package:client_base/models/product/product_model.dart';

class ProductVerticalListItem extends StatelessWidget {
  final ProductModel item;

  const ProductVerticalListItem(
    this.item, {
    Key? key,
  }) : super(key: key);

  void openItem(BuildContext context) {
    Navigator.of(context).pushNamed('product-details', arguments: item);
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => openItem(context),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        width: double.infinity,
        height: 150,
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(color: Colors.black12),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width - 140,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.title,
                        style: const TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 16,
                          height: 1.2,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
                      ),
                      item.description != null
                          ? Text(
                              item.description!,
                              style: const TextStyle(
                                fontSize: 14,
                                height: 1.2,
                              ),
                            )
                          : const SizedBox.shrink(),
                    ],
                  ),
                  Text(item.getPrice()),
                ],
              ),
            ),
            SizedBox(
              width: 100,
              height: double.infinity,
              child: Image.network(
                item.image,
                height: double.infinity,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
