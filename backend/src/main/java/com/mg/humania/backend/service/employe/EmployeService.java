package com.mg.humania.backend.service.employe;

import com.mg.humania.backend.dto.employe.EmployeDTO;
import com.mg.humania.backend.mapper.employe.EmployeMapper;
import com.mg.humania.backend.entity.employe.Employe;
import com.mg.humania.backend.repository.employe.EmployeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeService {

    private final EmployeRepository employeRepository;
    private final EmployeMapper employeMapper;

    public List<EmployeDTO> getAllEmployes() {
        return employeRepository.findAll()
                .stream()
                .map(employeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<EmployeDTO> getEmployesActifs() {
        return employeRepository.findByStatut("actif")
                .stream()
                .map(employeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<EmployeDTO> getEmployeById(Integer id) {
        return employeRepository.findById(id)
                .map(employeMapper::toDTO);
    }

    public Optional<EmployeDTO> getEmployeByMatricule(String matricule) {
        return employeRepository.findByMatricule(matricule)
                .map(employeMapper::toDTO);
    }

    public EmployeDTO createEmploye(EmployeDTO employeDTO) {
        Employe employe = employeMapper.toEntity(employeDTO);
        Employe saved = employeRepository.save(employe);
        return employeMapper.toDTO(saved);
    }

    public EmployeDTO updateEmploye(Integer id, EmployeDTO employeDTO) {
        return employeRepository.findById(id)
                .map(employe -> {
                    employe.setMatricule(employeDTO.getMatricule());
                    employe.setDateEmbauche(employeDTO.getDateEmbauche());
                    employe.setStatut(employeDTO.getStatut());
                    Employe updated = employeRepository.save(employe);
                    return employeMapper.toDTO(updated);
                })
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));
    }

    public void deleteEmploye(Integer id) {
        employeRepository.deleteById(id);
    }
}
