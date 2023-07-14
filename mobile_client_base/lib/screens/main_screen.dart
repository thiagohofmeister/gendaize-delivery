import 'package:flutter/material.dart';
import 'package:mobile_client_base/components/template/nav_drawer.dart';
import 'package:mobile_client_base/store/navigation_store.dart';
import 'package:provider/provider.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  Widget build(BuildContext context) {
    NavigationStore navigationStore =
        Provider.of<NavigationStore>(context, listen: true);

    return Scaffold(
      drawer: const NavDrawer(),
      //bottomNavigationBar: const NavBottom(),
      body: navigationStore.currentScreen.widget,
    );
  }
}
