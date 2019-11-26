import Tool from '../schemas/Tool';

class ToolsController {
  async index(req, res) {
    if (req.query.tag) {
      const { tag } = req.query;
      if (tag) {
        const tools = await Tool.find({ tags: tag });

        return res.status(200).json(tools);
      }
    }
    console.log('Acessar Mongoose');
    const tools = await Tool.find();

    return res.status(200).json(tools);

    // Buscar no banco

    // return res.status(200).json({ id, title, link, description, tags: [] });

    // Se receber query 'tag', apenas filtrar

    // return res.status(200).json({ id, title, link, description, tags: [] });
  }

  // Não vai usar... apenas com query
  // async show(req, res) {}

  async store(req, res) {
    const { title, link, description, tags } = req.body;

    console.log(title, link, description);

    const tool = await Tool.create({ title, link, description, tags });

    return res.status(201).json(tool);
  }

  // Não vai usar
  // async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;

    await Tool.findByIdAndDelete(id);

    // Pq a mensagem não funciona?
    return res.status(204).json({ message: 'Registro deletado.' });
  }
}

export default new ToolsController();
