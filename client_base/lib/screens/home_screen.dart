import 'package:flutter/material.dart';
import 'package:client_base/components/product/product_horizontal_list.dart';
import 'package:client_base/components/product/product_vertical_list.dart';
import 'package:client_base/store/product_store.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextButton(
                    onPressed: () {},
                    child: const Padding(
                      padding: EdgeInsets.only(left: 10.0),
                      child: Row(
                        children: [
                          Text(
                            'Sua localização',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Icon(Icons.keyboard_arrow_down)
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SliverToBoxAdapter(
              child: Column(
                children: [
                  ProductHorizontalList(
                    title: 'Seus últimos pedidos',
                    products: Provider.of<ProductStore>(context).items,
                  ),
                  const SizedBox(height: 20),
                  ProductHorizontalList(
                    title: 'Mais pedidos',
                    products: Provider.of<ProductStore>(context).items,
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
            ProductVerticalList(
              title: "Lanches",
              products: Provider.of<ProductStore>(context).items,
            ),
          ],
        ),
      ),
    );
  }
}
