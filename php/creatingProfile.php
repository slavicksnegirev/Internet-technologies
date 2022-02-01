<?php
require_once '../php/functions.php';

$image = $_FILES["img"];
$types = ["image/jpeg", "image/png"];

if (!in_array($image["type"], $types)) {
    die('Incorrect file type');
}

$fileSize = $image["size"] / 1000000;
$maxSize = 1;

if ($fileSize > $maxSize) {
    die('Incorrect file size');
}

if (!is_dir('../uploads')) {
    mkdir('../uploads', 0777, true);
}

$extension = pathinfo($image["name"], PATHINFO_EXTENSION);
$imgName = time() . ".$extension";

$fields = [
    'surname' => [
        'fields_name' => 'Фамилия',
    ],
    'name' => [
        'fields_name' => 'Имя',
    ],
    'patronymic' => [
        'fields_name' => 'Отчество',
    ],
    'email' => [
        'fields_name' => 'Email',
    ],
    'password' => [
        'fields_name' => 'Пароль',
    ],
    'secondpassword' => [
        'fields_name' => 'Подтверждения пароля',
    ],
    'role' => [
        'fields_name' => 'Роль',
    ],
    'reputation' => [
        'fields_name' => 'Репутация',
    ],
    'date' => [
        'fields_name' => 'Дата',
    ],
    'about' => [
        'fields_name' => 'О себе',
    ],
];
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Профиль <?=$_POST['name']?></title>
    <link rel="stylesheet" href="../css/connectingCSS.css">
    <link rel="stylesheet" href="../css/imageProcessing.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:ital,wght@0,300;0,400;0,600;0,700;1,600&display=swap"
          rel="stylesheet">
</head>
<body>
<header class="header">
    <div class="wrapper">
        <div class="header__wrapper">
            <div class="header__logo">
                <a href="../index.html" class="header__logo-link">
                    <img src="../images/logo.png" alt="Home">
                </a>
            </div>
            <nav class="header__nav">
                <ul class="header__list">
                    <li class="header__item">
                        <a href="../index.html" class="header__link">Статья</a>
                    </li>
                    <li class="header__item">
                        <a href="../html/statistics.html" class="header__link">Статистика</a>
                    </li>
                    <li class="header__item">
                        <a href="../html/notes.html" class="header__link">Заметки</a>
                    </li>
                    <li class="header__item">
                        <a href="../html/form.html" class="header__link">Регистрация</a>
                    </li>
                    <li class="header__item">
                        <a href="../html/API.html" class="header__link">Внешний&nbspAPI</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>
<main class="main">
    <div class="wrapper">
        <div class="files">
            <?php
            $fields = load($fields);
                if (!is_dir('../users')) {
                    mkdir('../users', 0777, true);
                }
                $str = loadText($fields);
                $fileTxtName = time() . '.txt';
                file_put_contents("../users/" . $fileTxtName, $str);

                if (!move_uploaded_file($image["tmp_name"], "../uploads/" . $imgName)) {
                    die('Ошибка загрузки');
                }
                $urlIMG = "../uploads/{$imgName}";
                echo '<h1 class="heading">Вы успешно зарегистрировались!</h1>';
                $url = "../users/$fileTxtName";
                $txtFile = basename($url);
            ?>
            <div class="image">
                <a href="<?= $urlIMG ?>" data-lightbox="image-5" data-title="">
                    <img src="<?= $urlIMG ?>" alt="">
                </a>
            </div>
            <?php echo '<a href="../users/' . $txtFile . '" download=""><button type="button" onclick="validatePassword()" class="form__button">Скачать файл с данными</button></a>';?>
            <br><br><br>
        </div>
    </div>
</main>

<script src="../js/openingImages.js"></script>
</body>
</html>



