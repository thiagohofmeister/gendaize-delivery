import 'package:client_base/utils/parse_utils.dart';

class ProductModel {
  String id;
  String image;
  String title;
  double price;
  String? description;

  ProductModel({
    required this.id,
    required this.image,
    required this.title,
    required this.price,
    this.description,
  });

  String getPrice() {
    return ParseUtils.toMoney(price);
  }
}
