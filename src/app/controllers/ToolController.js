import { Op } from 'sequelize';
import Tool from '../models/Tool';

// Basic Controller Snippet - https://gusflopes.dev

class ToolController {
  async index(req, res) {
    if (req.query.tags) {
      // List only Tools with the Tag
      const { tags } = req.query;

      const tools = await Tool.findAll({
        where: {
          tags: {
            [Op.contains]: [tags],
          },
        },
      });

      return res.status(200).json(tools);
    }
    // List All Tools
    const tools = await Tool.findAll();

    return res.status(200).json(tools);
  }

  async show(req, res) {
    // Show method
    const id = req.params;
    try {
      const tool = await Tool.findOne({ where: id });

      return res.status(200).json(tool);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async store(req, res) {
    // Store method
    const data = req.body;
    try {
      const tool = await Tool.create(data);
      return res.status(201).json(tool);
    } catch (err) {
      // const { message } = err.errors;
      return res.status(400).json(err);
    }
  }

  async update(req, res) {
    // Update method
    const data = req.body;
    const id = req.params;
    try {
      const prevTool = await Tool.findOne({ where: id });
      const tool = await prevTool.update(data);

      return res.status(200).json(tool);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async delete(req, res) {
    // Delete method
    const id = req.params;
    try {
      const tool = await Tool.findOne({ where: id });
      tool.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new ToolController();
