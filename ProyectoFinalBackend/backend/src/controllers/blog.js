import blogInstance from "../services/blog.js";

class BlogController {
  // Constructor de la clase BlogController
  constructor() {
    this.blog = blogInstance; // Se inicializa con una instancia del servicio de blog
  }

  // Método para obtener todos los posts
  async getPosts(req, res) {
    try {
      const posts = await this.blog.getPosts(); // Llama al método getPosts del servicio de blog
      res.status(200).json(posts); // Envía los posts como respuesta con un código de estado 200
    } catch (err) {
      console.log(err); // Registra el error en la consola
      res.status(500).json({ msg: "Error al obtener los posts" }); // Envía un mensaje de error con un código de estado 500
    }
  }

  // Método para obtener un post específico por ID
  async getPostById(req, res) {
    try {
      const { id } = req.params; // Extrae el ID del post de los parámetros de la solicitud
      const post = await this.blog.getPostById(id); // Llama al método getPostById del servicio de blog
      res.status(200).json(post); // Envía el post como respuesta con un código de estado 200
    } catch (err) {
      console.log(err); // Registra el error en la consola
      res.status(500).json({ msg: "Error al obtener el post por ID" }); // Envía un mensaje de error con un código de estado 500
    }
  }

  // Método para guardar un nuevo post
  async savePost(req, res) {
    try {
      const post = req.body; // Extrae el cuerpo del post de la solicitud
      const savedPost = await this.blog.savePost(post); // Llama al método savePost del servicio de blog
      res.status(201).json(savedPost); // Envía el post guardado como respuesta con un código de estado 201
    } catch (err) {
      console.log(err); // Registra el error en la consola
      res.status(500).json({ msg: "Error al guardar el post" }); // Envía un mensaje de error con un código de estado 500
    }
  }

  // Método para actualizar un post específico por ID
  async updatePost(req, res) {
    try {
      const { id } = req.params; // Extrae el ID del post de los parámetros de la solicitud
      const post = req.body; // Extrae el cuerpo del post de la solicitud
      const updatedPost = await this.blog.updatePost(id, post); // Llama al método updatePost del servicio de blog
      res.status(200).json(updatedPost); // Envía el post actualizado como respuesta con un código de estado 200
    } catch (err) {
      console.log(err); // Registra el error en la consola
      res.status(500).json({ msg: "Error al actualizar el post por ID" }); // Envía un mensaje de error con un código de estado 500
    }
  }

  // Método para eliminar un post específico por ID
  async deletePost(req, res) {
    try {
      const { id } = req.params; // Extrae el ID del post de los parámetros de la solicitud
      const post = await this.blog.deletePost(id); // Llama al método deletePost del servicio de blog
      res.status(200).json(post); // Envía el post eliminado como respuesta con un código de estado 200
    } catch (err) {
      console.log(err); // Registra el error en la consola
      res.status(500).json({ msg: "Error al eliminar el post por ID" }); // Envía un mensaje de error con un código de estado 500
    }
  }
}

// Exporta una instancia de la clase BlogController
export default new BlogController();
