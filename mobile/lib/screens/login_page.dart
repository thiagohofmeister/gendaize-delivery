import 'package:flutter/material.dart';
import 'package:mobile/services/authentication_service.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final GlobalKey<FormState> formKey = GlobalKey<FormState>();
    final userController = TextEditingController();
    final passwordController = TextEditingController();

    handleSignIn() {
      AuthenticationService()
          .authenticate(
        userController.text,
        passwordController.text,
      )
          .then((value) {
        Navigator.pushReplacementNamed(context, 'home');
      }).catchError((error) {
        print(error);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            backgroundColor: Colors.red,
            content: Text('Usuário e/ou senha inválido. Tente novamente!'),
          ),
        );
      });
    }

    return Scaffold(
      body: Form(
        key: formKey,
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextFormField(
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      hintText: 'E-mail, telefone ou CPF',
                    ),
                    validator: (value) {
                      if (value != null && value.isEmpty) {
                        return "Preencha o usuário";
                      }

                      return null;
                    },
                    controller: userController,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextFormField(
                    obscureText: true,
                    validator: (value) {
                      if (value != null && value.isEmpty) {
                        return "Preencha a senha";
                      }

                      return null;
                    },
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      hintText: 'Senha',
                    ),
                    controller: passwordController,
                  ),
                ),
                ElevatedButton(
                  onPressed: handleSignIn,
                  child: const Text('Acessar'),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
