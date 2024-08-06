import { useState } from 'react';
import { useFlights, useAddFlight, useUpdateFlight, useDeleteFlight } from '../integrations/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const Index = () => {
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    departure_airport: '',
    arrival_airport: '',
    departure_time: '',
    arrival_time: '',
    airline: '',
    status: ''
  });
  const [editingFlight, setEditingFlight] = useState(null);

  const { data: flights, isLoading, isError } = useFlights();
  const addFlight = useAddFlight();
  const updateFlight = useUpdateFlight();
  const deleteFlight = useDeleteFlight();

  const handleAddFlight = () => {
    if (Object.values(newFlight).every(val => val !== null && val !== undefined && val.toString().trim() !== '')) {
      addFlight.mutate(newFlight, {
        onSuccess: () => {
          setNewFlight({
            flight_number: '',
            departure_airport: '',
            arrival_airport: '',
            departure_time: '',
            arrival_time: '',
            airline: '',
            status: ''
          });
          toast.success('Flight added successfully');
        },
        onError: (error) => toast.error(`Error adding flight: ${error.message}`)
      });
    }
  };

  const handleUpdateFlight = () => {
    if (editingFlight && Object.values(editingFlight).every(val => val !== null && val !== undefined && val.toString().trim() !== '')) {
      updateFlight.mutate(editingFlight, {
        onSuccess: () => {
          setEditingFlight(null);
          toast.success('Flight updated successfully');
        },
        onError: (error) => toast.error(`Error updating flight: ${error.message}`)
      });
    }
  };

  const handleDeleteFlight = (id) => {
    deleteFlight.mutate(id, {
      onSuccess: () => toast.success('Flight deleted successfully'),
      onError: (error) => toast.error(`Error deleting flight: ${error.message}`)
    });
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error loading flights</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flights CRUD</h1>
      
      <div className="mb-4 grid grid-cols-3 gap-2">
        <Input
          type="text"
          value={newFlight.flight_number}
          onChange={(e) => setNewFlight({...newFlight, flight_number: e.target.value})}
          placeholder="Flight Number"
        />
        <Input
          type="text"
          value={newFlight.departure_airport}
          onChange={(e) => setNewFlight({...newFlight, departure_airport: e.target.value})}
          placeholder="Departure Airport"
        />
        <Input
          type="text"
          value={newFlight.arrival_airport}
          onChange={(e) => setNewFlight({...newFlight, arrival_airport: e.target.value})}
          placeholder="Arrival Airport"
        />
        <Input
          type="datetime-local"
          value={newFlight.departure_time}
          onChange={(e) => setNewFlight({...newFlight, departure_time: e.target.value})}
          placeholder="Departure Time"
        />
        <Input
          type="datetime-local"
          value={newFlight.arrival_time}
          onChange={(e) => setNewFlight({...newFlight, arrival_time: e.target.value})}
          placeholder="Arrival Time"
        />
        <Input
          type="text"
          value={newFlight.airline}
          onChange={(e) => setNewFlight({...newFlight, airline: e.target.value})}
          placeholder="Airline"
        />
        <Input
          type="text"
          value={newFlight.status}
          onChange={(e) => setNewFlight({...newFlight, status: e.target.value})}
          placeholder="Status"
        />
        <Button onClick={handleAddFlight} className="col-span-3">Add Flight</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flight Number</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights && flights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell>{flight.flight_number}</TableCell>
              <TableCell>{`${flight.departure_airport} (${new Date(flight.departure_time).toLocaleString()})`}</TableCell>
              <TableCell>{`${flight.arrival_airport} (${new Date(flight.arrival_time).toLocaleString()})`}</TableCell>
              <TableCell>{flight.airline}</TableCell>
              <TableCell>{flight.status}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingFlight(flight)} className="mr-2">Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteFlight(flight.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Flight</h2>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="text"
                value={editingFlight.flight_number}
                onChange={(e) => setEditingFlight({...editingFlight, flight_number: e.target.value})}
                placeholder="Flight Number"
              />
              <Input
                type="text"
                value={editingFlight.departure_airport}
                onChange={(e) => setEditingFlight({...editingFlight, departure_airport: e.target.value})}
                placeholder="Departure Airport"
              />
              <Input
                type="text"
                value={editingFlight.arrival_airport}
                onChange={(e) => setEditingFlight({...editingFlight, arrival_airport: e.target.value})}
                placeholder="Arrival Airport"
              />
              <Input
                type="datetime-local"
                value={editingFlight.departure_time.slice(0, 16)}
                onChange={(e) => setEditingFlight({...editingFlight, departure_time: e.target.value})}
                placeholder="Departure Time"
              />
              <Input
                type="datetime-local"
                value={editingFlight.arrival_time.slice(0, 16)}
                onChange={(e) => setEditingFlight({...editingFlight, arrival_time: e.target.value})}
                placeholder="Arrival Time"
              />
              <Input
                type="text"
                value={editingFlight.airline}
                onChange={(e) => setEditingFlight({...editingFlight, airline: e.target.value})}
                placeholder="Airline"
              />
              <Input
                type="text"
                value={editingFlight.status}
                onChange={(e) => setEditingFlight({...editingFlight, status: e.target.value})}
                placeholder="Status"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleUpdateFlight} className="mr-2">Save</Button>
              <Button variant="secondary" onClick={() => setEditingFlight(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
