import 'package:flutter/material.dart';

import '../services/authentication_service.dart';

class AuthenticationStore extends ChangeNotifier {
  String? token;

  AuthenticationStore() : super();

  void setToken(String token) {
    this.token = token;
  }

  Future<void> logout() async {
    await AuthenticationService().logout(token: token!);
  }
}
