import 'package:flutter/material.dart';
import 'package:mobile_client_base/screens/main_screen.dart';
import 'package:mobile_client_base/screens/splash_screen.dart';
import 'package:mobile_client_base/store/navigation_store.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => NavigationStore()),
    ],
    child: const MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gendaize Delivery',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.lightBlue,
        ),
        useMaterial3: true,
      ),
      initialRoute: 'splash',
      routes: {
        'splash': (context) => const SplashScreen(),
        'main': (context) => const MainScreen(),
      },
    );
  }
}
