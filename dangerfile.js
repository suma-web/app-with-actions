import { warn, danger } from "danger";

const changedLines =
  danger.github.pr.additions +
  danger.github.pr.deletions;

if (changedLines > 200) {
  warn("変更行数が200行を超えています");
}

const changedFiles =
  danger.git.modified_files.length +
  danger.git.created_files.length +
  danger.git.deleted_files.length;

if (changedFiles > 10) {
  warn("編集ファイル数が10を超えています");
}
