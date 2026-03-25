def match_partners(user_skills: list, all_users: list):
    matches = []

    for user in all_users:
        common = set(user_skills).intersection(set(user.get("skills", [])))

        if len(common) > 0:
            matches.append({
                "user_id": str(user["_id"]),
                "common_skills": list(common)
            })

    return sorted(matches, key=lambda x: len(x["common_skills"]), reverse=True)
