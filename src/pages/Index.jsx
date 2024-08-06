import { useState } from 'react';
import { useItems, useAddItem, useUpdateItem, useDeleteItem } from '../integrations/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const Index = () => {
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const { data: items, isLoading, isError } = useItems();
  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem.mutate({ name: newItemName.trim() }, {
        onSuccess: () => {
          setNewItemName('');
          toast.success('Item added successfully');
        },
        onError: (error) => toast.error(`Error adding item: ${error.message}`)
      });
    }
  };

  const handleUpdateItem = () => {
    if (editingItem && editingItem.name.trim()) {
      updateItem.mutate({ id: editingItem.id, name: editingItem.name.trim() }, {
        onSuccess: () => {
          setEditingItem(null);
          toast.success('Item updated successfully');
        },
        onError: (error) => toast.error(`Error updating item: ${error.message}`)
      });
    }
  };

  const handleDeleteItem = (id) => {
    deleteItem.mutate(id, {
      onSuccess: () => toast.success('Item deleted successfully'),
      onError: (error) => toast.error(`Error deleting item: ${error.message}`)
    });
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error loading items</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Items CRUD</h1>
      
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="flex-grow"
        />
        <Button onClick={handleAddItem}>Add Item</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {editingItem && editingItem.id === item.id ? (
                  <Input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {editingItem && editingItem.id === item.id ? (
                  <Button onClick={handleUpdateItem}>Save</Button>
                ) : (
                  <Button onClick={() => setEditingItem(item)}>Edit</Button>
                )}
                <Button variant="destructive" onClick={() => handleDeleteItem(item.id)} className="ml-2">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;
