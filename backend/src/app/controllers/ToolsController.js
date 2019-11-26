import Tool from '../schemas/Tool';

class ToolsController {
  // List Tools
  async index(req, res) {
    // List only tools with provided query params
    if (req.query.tag) {
      const { tag } = req.query;
      if (tag) {
        const tools = await Tool.find({ tags: tag });

        return res.status(200).json(tools);
      }
    }

    // List all the tools
    const tools = await Tool.find();

    return res.status(200).json(tools);
  }

  // Show details of the tool with the provided id
  async show(req, res) {
    const { id } = req.params;

    const tool = await Tool.findById(id);

    return res.status(200).json(tool);
  }

  // Create a new tool
  async store(req, res) {
    const { title, link, description, tags } = req.body;

    const tool = await Tool.create({ title, link, description, tags });

    return res.status(201).json(tool);
  }

  // Update tools with the provided id
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const tool = await Tool.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json(tool);
  }

  // Delete Tool with the provided id
  async delete(req, res) {
    const { id } = req.params;

    await Tool.findByIdAndDelete(id);

    return res.status(204).json({ message: 'Registro deletado.' });
  }
}

export default new ToolsController();
