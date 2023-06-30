import 'package:flutter/material.dart';
import 'package:mobile_client_base/models/product/product_model.dart';

class ProductHorizontalListItem extends StatelessWidget {
  final ProductModel item;

  const ProductHorizontalListItem(
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
      child: SizedBox(
        child: Card(
          clipBehavior: Clip.hardEdge,
          color: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            side: const BorderSide(color: Colors.black26),
            borderRadius: BorderRadiusDirectional.circular(10),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                width: MediaQuery.of(context).size.width - 220,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.title,
                      style: const TextStyle(
                        fontSize: 16,
                        height: 1.2,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
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
      ),
    );
  }
}
