package view;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

public class Formulario_cliente extends JFrame {

	private JLabel lbNome;
	private JTextField txNome;

	private JLabel lbIdade;
	private JTextField txIdade;

	private JLabel lbEmail;
	private JTextField txEmail;

	private JLabel lbCPF;
	private JTextField txCPF;

	private JLabel lbGenero;

	private ButtonGroup grupoDeRadioGenero;
	private JRadioButton btMasc, btFem, btOutros;

	private JButton btExibir;

	public Formulario_cliente() {

		setTitle("Formulario cliente");
		setSize(800, 600);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setLocationRelativeTo(null);
		setResizable(false);
		setLayout(null);
		getContentPane().setBackground(Color.LIGHT_GRAY);

		// --- CONFIGURAÇÃO DE ALINHAMENTO CENTRALIZADO ---
		// Largura da janela = 800. O centro exato da tela é 400.
		// Para os campos de texto (Width = 200): Centro (400) - (200 / 2) = 300.
		// Para as Labels (Width = 200): Centro (400) - (200 / 2) = 300.
		
		int centroX_Campos = 300; 
		int larguraCampos = 200;

		// --- NOME ---
		lbNome = new JLabel();
		lbNome.setText("Nome:");
		lbNome.setBounds(centroX_Campos, 30, larguraCampos, 25); // Alinhado ao centro, acima do campo
		add(lbNome);

		txNome = new JTextField();
		txNome.setBounds(centroX_Campos, 55, larguraCampos, 30); 
		add(txNome);

		// --- IDADE ---
		lbIdade = new JLabel();
		lbIdade.setText("Idade:");
		lbIdade.setBounds(centroX_Campos, 95, larguraCampos, 25);
		add(lbIdade);

		txIdade = new JTextField();
		txIdade.setBounds(centroX_Campos, 120, larguraCampos, 30); 
		add(txIdade);

		// --- EMAIL ---
		lbEmail = new JLabel();
		lbEmail.setText("Email:");
		lbEmail.setBounds(centroX_Campos, 160, larguraCampos, 25);
		add(lbEmail);

		txEmail = new JTextField();
		txEmail.setBounds(centroX_Campos, 185, larguraCampos, 30); 
		add(txEmail);

		// --- CPF ---
		lbCPF = new JLabel();
		lbCPF.setText("CPF:");
		lbCPF.setBounds(centroX_Campos, 225, larguraCampos, 25);
		add(lbCPF);

		txCPF = new JTextField();
		txCPF.setBounds(centroX_Campos, 250, larguraCampos, 30); 
		add(txCPF);

		// --- GÊNERO ---
		// Centralizando o rótulo de Gênero (Width = 100): 400 - (100 / 2) = 350
		lbGenero = new JLabel();
		lbGenero.setText("Gênero:");
		lbGenero.setBounds(350, 300, 100, 30);
		add(lbGenero);

		// Centralizando os 3 RadioButtons lado a lado:
		// Total de largura ocupada pelos 3 = 100 + 100 + 100 = 300.
		// Início do bloco para ficar centralizado: 400 - (300 / 2) = 250.
		btMasc = new JRadioButton();
		btMasc.setBounds(250, 335, 100, 25);
		btMasc.setText("Masculino");
		btMasc.setBackground(Color.LIGHT_GRAY); // Combina com o fundo da tela
		add(btMasc);

		btFem = new JRadioButton();
		btFem.setBounds(350, 335, 100, 25);
		btFem.setText("Feminino");
		btFem.setBackground(Color.LIGHT_GRAY);
		add(btFem);

		btOutros = new JRadioButton();
		btOutros.setBounds(450, 335, 100, 25);
		btOutros.setText("Outros");
		btOutros.setBackground(Color.LIGHT_GRAY);
		add(btOutros);

		grupoDeRadioGenero = new ButtonGroup();
		grupoDeRadioGenero.add(btMasc);
		grupoDeRadioGenero.add(btFem);
		grupoDeRadioGenero.add(btOutros);

		// --- BOTÃO SALVAR ---
		// Centralizando o botão (Width = 150): 400 - (150 / 2) = 325
		btExibir = new JButton();
		btExibir.setText("Salvar");
		btExibir.setBounds(325, 450, 150, 50);
		btExibir.setForeground(Color.WHITE); 
		btExibir.setBackground(Color.BLACK); 

		btExibir.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				String nome = txNome.getText();

				String idade_text = txIdade.getText();
				int idade = Integer.parseInt(idade_text);

				String genero = "";

				String email = txEmail.getText();
				String dominio = "@gmail.com";
				email = String.format(email + dominio);

				String CPF = txCPF.getText();
	
				if (btMasc.isSelected()) {
					genero = btMasc.getText();
				} else if (btFem.isSelected()) {
					genero = btFem.getText();
				} else if (btOutros.isSelected()) {
					genero = btOutros.getText();
				}

				JOptionPane.showMessageDialog(null,
						"Nome: " + nome + "\nEMAIL: " + email + "\nIdade: " + idade + "\nGênero: " + genero + "\nCPF: " + CPF);
			}
		});

		add(btExibir);
		setVisible(true); // ÚLTIMA LINHA DO CONSTRUTOR
	}
}