import 'package:flutter/material.dart';
import 'package:mobile_client_base/models/product/product_model.dart';
import 'package:mobile_client_base/models/shared/response_list.dart';
import 'package:mobile_client_base/store/list_store_contract.dart';

class ProductStore extends ListStoreContract<ProductModel> {
  ProductStore() : super();

  @override
  Future<ResponseList<ProductModel>> getAll(BuildContext context,
      {Map<String, String>? params}) async {
    List<ProductModel> products = [
      ProductModel(
        id: '1',
        image:
            'https://img.freepik.com/fotos-gratis/o-pepperoni-em-fatias-finas-e-uma-cobertura-de-pizza-popular-em-pizzarias-de-estilo-americano-isolado-no-fundo-branco-natureza-morta_639032-229.jpg?w=2000',
        title: 'Pizza Média com borda de queijo',
        description: 'Descrição do produto',
        price: 50,
      ),
      ProductModel(
        id: '2',
        image:
            'https://s5.static.brasilescola.uol.com.br/be/2023/03/pizza-italiana-tradicional-com-tomates-e-manjericao-em-alusao-a-historia-da-pizza.jpg',
        title: 'Pizza Grande',
        price: 50,
      ),
      ProductModel(
        id: '3',
        image:
            'https://img.freepik.com/fotos-gratis/o-pepperoni-em-fatias-finas-e-uma-cobertura-de-pizza-popular-em-pizzarias-de-estilo-americano-isolado-no-fundo-branco-natureza-morta_639032-229.jpg?w=2000',
        title: 'Pizza Média',
        price: 50,
      ),
      ProductModel(
        id: '4',
        image:
            'https://s5.static.brasilescola.uol.com.br/be/2023/03/pizza-italiana-tradicional-com-tomates-e-manjericao-em-alusao-a-historia-da-pizza.jpg',
        title: 'Pizza Grande',
        price: 50,
      ),
      ProductModel(
        id: '5',
        image:
            'https://img.freepik.com/fotos-gratis/o-pepperoni-em-fatias-finas-e-uma-cobertura-de-pizza-popular-em-pizzarias-de-estilo-americano-isolado-no-fundo-branco-natureza-morta_639032-229.jpg?w=2000',
        title: 'Pizza Média',
        price: 50,
      ),
      ProductModel(
        id: '6',
        image:
            'https://s5.static.brasilescola.uol.com.br/be/2023/03/pizza-italiana-tradicional-com-tomates-e-manjericao-em-alusao-a-historia-da-pizza.jpg',
        title: 'Pizza Grande',
        price: 50,
      ),
    ];

    return ResponseList(items: products, total: products.length);
  }
}
