ALTER TABLE mensajes
  ADD COLUMN tipo_mensaje ENUM('texto', 'imagen', 'video', 'archivo') NOT NULL DEFAULT 'texto' AFTER contenido,
  ADD COLUMN archivo_url VARCHAR(500) DEFAULT NULL AFTER tipo_mensaje;

-- contenido puede ser vacío cuando hay archivo
ALTER TABLE mensajes MODIFY COLUMN contenido TEXT NULL;
