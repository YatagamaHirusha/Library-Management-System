package org.hirusha.library.DTO;

import org.hirusha.library.Model.Role;

public record UserRequest(String username, String password, Role role) {
}
