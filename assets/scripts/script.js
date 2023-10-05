document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Impede o envio padrão do formulário

      // Capture os valores dos campos do formulário
      const firstName = document.getElementById('firstname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Validação: Verifica se o campo Nome não está vazio
      if (firstName.trim() === '') {
        alert('Por favor, preencha o campo Nome.');
        return;
      }

      // Validação: Verifica se o campo E-mail é um e-mail válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
      }

      // Validação: Verifica se a senha tem pelo menos 6 caracteres
      if (password.length < 6) {
        alert('A senha deve conter pelo menos 6 caracteres.');
        return;
      }

      //Validação: Verifica se a senha e a confirmação de senha coincidem
      if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
      }

      // Crie um objeto userData com os dados do formulário
      const userData = {
        nome: firstName,
        email,
        senha: password,
      };

      // Crie uma instância do objeto XMLHttpRequest
      const xhr = new XMLHttpRequest();

      // Defina o método HTTP e a URL de destino
      xhr.open('POST', '/salvar-usuario', true);

      // Defina o cabeçalho Content-Type para JSON
      xhr.setRequestHeader('Content-Type', 'application/json');

// Configure a função de retorno de chamada para manipular a resposta
xhr.onload = function () {
    console.log('Status da resposta:', xhr.status); // Adicione esta linha para verificar o status da resposta
    if (xhr.status === 201) {
      console.log('Usuário cadastrado com sucesso!');
      // Redirecione o usuário ou faça outra ação desejada
    } else {
      console.error('Erro ao cadastrar usuário.');
      console.log('Resposta do servidor:', xhr.responseText); // Adicione esta linha para verificar a resposta do servidor
    }
  };

      // Converta os dados para JSON e envie-os
      const jsonData = JSON.stringify(userData);
      xhr.send(jsonData);
    });
  });

 