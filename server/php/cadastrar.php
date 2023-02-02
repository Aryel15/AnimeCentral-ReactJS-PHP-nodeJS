<?php
    //Headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

    //Incluir conexão
    include_once 'conexao.php';

    $response_json = file_get_contents('php://input');
    $dados = json_decode($response_json, true);



    if($dados){

        $query_anime = "INSERT INTO animes_list (titulo, status_, nota, user) VALUES (:titulo, :status_, :nota, :user)";
        $cad_anime = $conn->prepare($query_anime);
        $cad_anime->bindPaRAM(':titulo', $dados['anime']['titulo']);
        $cad_anime->bindPaRAM(':status_', $dados['anime']['status_']);
        $cad_anime->bindPaRAM(':nota', $dados['anime']['nota']);
        $cad_anime->bindPaRAM(':user', $dados['anime']['user']);

        $cad_anime->execute();

        if($cad_anime->rowCount()){
            $response = [
                "erro" => false,
                "message" => "Anime adicionado com sucesso!"
            ];
        }else{
            $response = [
                "erro" => true,
                "message" => "Anime não adicionado!"
            ];
        }
    }else{
        $response = [
            "erro" => true,
            "message" => "Anime não adicionado!"
        ];
    }

    http_response_code(200);
    echo json_encode($response);
