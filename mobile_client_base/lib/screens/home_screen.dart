import 'package:flutter/material.dart';
import 'package:mobile_client_base/components/template/nav_drawer.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      drawer: const NavDrawer(),
      body: const Center(child: Text('Bem vindo')),
    );
  }
}
