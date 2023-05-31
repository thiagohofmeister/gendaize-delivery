import 'package:flutter/material.dart';

class NavDrawer extends StatelessWidget {
  const NavDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          const DrawerHeader(
            child: Image(
              image: AssetImage('assets/images/logo.png'),
              width: 200,
            ),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () => {
              Navigator.pushReplacementNamed(context, 'home'),
            },
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Sair'),
            onTap: () => {

              Navigator.pushReplacementNamed(context, 'login'),
            },
          ),
        ],
      ),
    );
  }
}
