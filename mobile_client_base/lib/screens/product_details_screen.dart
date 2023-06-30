import 'package:flutter/material.dart';
import 'package:mobile_client_base/models/product/product_model.dart';
import 'package:mobile_client_base/store/product_store.dart';
import 'package:provider/provider.dart';

class ProductDetailsScreen extends StatefulWidget {
  const ProductDetailsScreen({Key? key}) : super(key: key);

  @override
  State<ProductDetailsScreen> createState() => _ProductDetailsScreenState();
}

class _ProductDetailsScreenState extends State<ProductDetailsScreen> {
  ProductModel? product;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final ProductModel? customerFromArgs =
        ModalRoute.of(context)?.settings.arguments as ProductModel?;

    if (customerFromArgs != null) {
      product = Provider.of<ProductStore>(context, listen: false)
          .items
          .firstWhere((i) => i.id == customerFromArgs.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(product!.title)),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: double.infinity,
            height: 250,
            child: Image.network(
              product!.image,
              height: double.infinity,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  product!.title,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                product!.description != null
                    ? Text(
                        product!.description!,
                        style: const TextStyle(
                          fontSize: 16,
                        ),
                      )
                    : const SizedBox.shrink(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
