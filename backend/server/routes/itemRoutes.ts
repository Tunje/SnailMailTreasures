import express, { Request, Response } from 'express';
import Item, { ItemDocument } from '../models/itemModel';

const itemRouter = express.Router();

itemRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items = await Item.find().populate('userId', 'username email');
    res.json(items);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

itemRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const items = await Item.findById(req.params.id).populate(
      'userId',
      'username email'
    );
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

itemRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const items = await Item.find({
      itemName: { $regex: new RegExp(q as string, 'i') },
    }).populate('userId', 'username email');
    res.json(items);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

itemRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { itemName, description, imageUrl, category, price, userId } =
      req.body;
    const newItem = new Item({
      itemName,
      description,
      imageUrl,
      category,
      price,
      userId,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

itemRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updateItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updateItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

itemRouter.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'User not found' });
    }

    res
      .status(200)
      .json({
        message: `Item by name '${deletedItem.itemName}' with ID (ID: ${deletedItem._id}) was successfully deleted.`,
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default itemRouter;
