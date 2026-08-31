package com.sivahotel.hotel._management.repository;

import com.sivahotel.hotel._management.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByRoomNumber(String roomNumber);

    List<Room> findByRoomType(String roomType);

    List<Room> findByStatus(String status);

    List<Room> findByFloor(Integer floor);

    List<Room> findByCapacity(Integer capacity);
}
