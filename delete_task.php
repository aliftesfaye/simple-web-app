<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$stmt = $pdo->prepare('DELETE FROM tasks WHERE id = :id');
$stmt->execute(['id' => $id]);

echo json_encode(['success' => true]);
?>
