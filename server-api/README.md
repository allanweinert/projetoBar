# Java

## Instalar JDK do Java 8

- Ubuntu: 
    - Tutorial: https://www.geofis.org/en/install/install-on-linux/install-openjdk-8-on-ubuntu-trusty/
- Windows:
    - Tutorial: https://www.youtube.com/watch?v=eMUoIlOoLco
    - Download: https://github.com/ojdkbuild/ojdkbuild
    - a parte da configuração do path só e necessário se os camandos de verificação listados a baixo não funcionarem após a instalação

## Verificando se a instalação está correta
- `Atenção:` Executar no cmd/bash: 
- `java -version`
<br/>resultado aproximado:
```bash
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (build 1.8.0_222-8u222-b10-1ubuntu1~18.04.1-b10)
OpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)
```
<br/>

- `javac -version`
<br/>resultado aproximado:
```bash
javac 1.8.0_222
```

    
# Maven

- Instalar Maven na versão 3.5.4+
    - Ubuntu: https://linuxize.com/post/how-to-install-apache-maven-on-ubuntu-18-04/
    - Windows: https://www.mkyong.com/maven/how-to-install-maven-in-windows/
    - Obs.: nos tutoriais mostram como instalar o Java, mas já fizemos isso na sessão anterior, então pode-se ignora-la.

# PostgreSQL

- Instalação (Preferencialmente a versão 10.10):
- Utilizar a porta 5432
- https://www.postgresql.org/download/
- Instalar uma ferramenta de criação de sql, exemplos:
    - PGAdmin: https://www.pgadmin.org/download/
    - DBeaver: https://dbeaver.io/download/
- Pela ferramenta de SQL, executar os comandos:
```sql
CREATE DATABASE idstreina1;
CREATE USER idstreina WITH PASSWORD 'treina123';
ALTER USER idstreina WITH SUPERUSER;
```

# Fontes iniciais

Para baixar os fontes iniciais pode-se utilizar um download ou o GIT
- Download:
    - https://codeload.github.com/ordnaelmedeiros/ids-treina1/zip/master

- GIT
    - instalação: https://git-scm.com/download
    - git clone https://github.com/ordnaelmedeiros/ids-treina1

- Dentro da pasta `treina1-api` executar:
    - `mvn clean package` 
    - Obs.: pode sair tomar um café
    - `mvn compile quarkus:dev`
    - Acessar `http://localhost:8080/home`
    - deve aparecer algo parecido com isso:

```
IDS Treina 1
Hello World
```

# Eclipse
- Link para download:
- https://www.eclipse.org/downloads/
- Ao instalar escolher a opção:
    - Eclipse IDE for Enterprise Java Developers
- Escolha do Java 1.8+ VM
    - Normalmente já vem selecionado o JRE do Java:
    - Ex.: {...}/ojdkbuild/java-1.8.0-openjdk-1.8.0.222-2/jre
    - Necessário remover o `/jre` do final do caminho


# Final
Se tudo correu bem, te espero no treinamento.<br/>
Se não, pode me chamar que eu ajudo:
- leandro@ids.inf.br
- ordnaelmedeiros@gmail.com
