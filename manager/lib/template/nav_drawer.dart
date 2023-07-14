import 'package:flutter/material.dart';

class NavDrawer extends StatelessWidget {
  const NavDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          DrawerHeader(
            child: Container(),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Início'),
            onTap: () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                'main',
                (route) => true,
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.business),
            title: const Text('Filiais'),
            onTap: () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                'headquarter-list',
                (route) => true,
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.attach_money),
            title: const Text('Taxas'),
            onTap: () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                'tax-list',
                (route) => true,
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.category),
            title: const Text('Serviços'),
            onTap: () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                'service-list',
                (route) => true,
              );
            },
          ),
        ],
      ),
    );
  }
}
