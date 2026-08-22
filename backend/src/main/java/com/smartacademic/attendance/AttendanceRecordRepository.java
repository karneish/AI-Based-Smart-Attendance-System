package com.smartacademic.attendance;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {

    List<AttendanceRecord> findBySessionId(Long sessionId);

    Optional<AttendanceRecord> findBySessionIdAndStudentId(Long sessionId, Long studentId);

    @Query("select r from AttendanceRecord r "
            + "join fetch r.session s "
            + "left join fetch s.timetableEntry "
            + "join fetch s.subject "
            + "join fetch s.section "
            + "where r.student.id = :studentId "
            + "order by r.markedAt desc")
    List<AttendanceRecord> findStudentHistory(@Param("studentId") Long studentId);

    List<AttendanceRecord> findBySession_IdIn(List<Long> sessionIds);

    long countBySession_IdInAndStatus(List<Long> sessionIds, AttendanceStatus status);

    long countBySession_IdInAndStudentIdAndStatus(List<Long> sessionIds, Long studentId, AttendanceStatus status);

    List<AttendanceRecord> findBySession_SectionIdIn(List<Long> sectionIds);

    @Modifying
    @Query("update AttendanceRecord r set r.status = com.smartacademic.attendance.AttendanceStatus.PRESENT "
            + "where r.status = 'PENDING'")
    int resolvePending();

    @Modifying
    @Query(value = "ALTER TABLE attendance_records DROP CONSTRAINT IF EXISTS attendance_records_status_check", nativeQuery = true)
    void dropStatusCheckConstraint();
}
