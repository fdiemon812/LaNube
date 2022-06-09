export interface MensajeInterface {
  id:       number;
  asunto:   string;
  texto:    string;
  fecha:    Date;
  emisor:   User;
  receptor: User;
}

export interface User {
  nombre:    string;
  apellidos: string;
  dni:       string;
  email:     string;
  tlf:       string;
  role:      string;
  id:        number;
}
