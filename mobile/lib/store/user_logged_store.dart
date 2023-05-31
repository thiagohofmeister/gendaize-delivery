import 'package:flutter/material.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/services/authentication_service.dart';

import '../services/user_service.dart';

class UserLoggedStore extends ChangeNotifier {
  UserModel? user;
  bool isFetching = false;

  UserLoggedStore() : super();

  Future<void> fetch(String token) async {
    isFetching = true;
    user = await UserService(token: token).getLogged();
    isFetching = false;
  }

  Future<void> logout(String token) async {
    isFetching = true;
    await AuthenticationService().logout(token: token);
    user = null;
    isFetching = false;
  }
}
